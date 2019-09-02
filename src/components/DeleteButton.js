import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from 'util/graphql';

const DeleteButton = ({ id }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    variables: { postId: id },
    update(proxy, result) {
      console.log(result.data);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      data.getPosts = data.getPosts.filter(post => post.id !== id);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
    },
  });

  return (
    <Button as="div" color="red" floated="right" onClick={deletePost}>
      <Icon name="trash" style={{ margin: 0 }} />
    </Button>
  );
};

export default DeleteButton;
