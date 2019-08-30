import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST_MUTATION } from 'util/graphql';

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);
  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const likeButton = user ? (
    <Button
      basic={!liked}
      color="teal"
      icon="heart"
      label={{
        basic: true,
        color: 'teal',
        pointing: 'left',
        content: likeCount,
      }}
      onClick={likePost}
    />
  ) : (
    <Button
      color="teal"
      icon="heart"
      label={{
        basic: true,
        color: 'teal',
        pointing: 'left',
        content: likeCount,
      }}
      as={Link}
      to="/login"
    />
  );
  return likeButton;
};

export default LikeButton;
