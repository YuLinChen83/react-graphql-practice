import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from 'context/auth';
import LikeButton from 'components/LikeButton';
import DeleteButton from 'components/DeleteButton';

const PostCard = ({
  post: { id, body, createdAt, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Button
          basic
          color="blue"
          icon="comments"
          label={{
            basic: true,
            color: 'blue',
            pointing: 'left',
            content: commentCount,
          }}
          as={Link}
          to={`/posts/${id}`}
        />
        {user && user.username === username && <DeleteButton id={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
