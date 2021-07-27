import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import ServicesContext from '../contexts/ServicesContext';
import { PostGatewayInterface } from '../gateways/PostGateway';
import Post from '../models/Post';

export interface PostListPageProps extends RouteComponentProps<{
  userId: string;
}> {}

export interface PostListPageState {
  posts: Post[];
}

class PostListPage extends React.Component<PostListPageProps, PostListPageState> {
  constructor(props: Readonly<any>) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    const { match: { params: { userId: paramUserId = '-1' } = {} } = {} } = this.props;
    if (paramUserId.match(/[1-9][0-9]*/) === null || parseInt(paramUserId, 10) <= 0) {
      this.setState(() => {
        throw new Error(
          'Received an invalid user id in the URI while trying to retrieve user posts.',
        );
      });
    }

    const { postGateway }: {postGateway: PostGatewayInterface} = this.context;
    postGateway.getPostsByUserId(parseInt(paramUserId, 10))
      .then((posts: Post[]) => {
        this.setState({
          posts,
        });
      })
      .catch((error) => {
        this.setState(() => {
          throw error;
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

export default withRouter(PostListPage);
