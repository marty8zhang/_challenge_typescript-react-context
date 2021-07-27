import React from 'react';
import ServicesContext from '../contexts/ServicesContext';
import { PostGatewayInterface } from '../gateways/PostGateway';
import Post from '../models/Post';

export interface PostListPageProps {
  userId: number;
}

export interface PostListPageState {
  posts: Post[];
}

export default class PostListPage extends React.Component<PostListPageProps, PostListPageState> {
  constructor(props: Readonly<any>) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    const { postGateway }: {postGateway: PostGatewayInterface} = this.context;

    postGateway.getPostsByUserId(userId)
      .then((posts: Post[]) => {
        this.setState({
          posts,
        });
      });
  }

  render() {
    const { posts } = this.state;
    const postList = posts.map((post) => (
      <tr key={post.id}>
        <td>{post.title}</td>
        <td>{post.body}</td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Page</th>
          </tr>
        </thead>
        <tbody>
          {postList.length ? postList
            : (
              <tr>
                <td colSpan={2}>No Post Found.</td>
              </tr>
            )}
        </tbody>
      </table>
    );
  }
}

PostListPage.contextType = ServicesContext;
