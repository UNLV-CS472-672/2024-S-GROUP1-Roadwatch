import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUniversalPost, Reply } from '../../types/types.ts';
import { CommunityPost } from '@/components';
import { Loading } from '@/components';
import styles from './PostDiscussion.module.scss';

interface PostDiscussionProps {
  id: string;
}

const PostDiscussion: React.FC<PostDiscussionProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IUniversalPost | null>(null);
  const [newReply, setNewReply] = useState('');

  useEffect(() => {
    // Fetch the post data based on the ID
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(data => setPost(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewReply(event.target.value);
  };

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Make an API request to post the new reply
    const response = await fetch(`/api/posts/${id}/replies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: newReply }),
    });
  
    if (!response.ok) {
      console.error('Error posting reply');
      return;
    }
  
    const reply = await response.json();
  
    // Update the local state to include the new reply
    setPost(prevPost => {
      if (!prevPost) {
        return null;
      }
  
      return {
        ...prevPost,
        replies: [...prevPost.replies, reply],
      };
    });
  
    // Clear the reply input
    setNewReply('');
  };

  if (!post) {
    return <Loading />;
  }

  return (
    <div className={styles.PostDiscussion__container}>
      <h1 className={styles.PostDiscussion__title}>{post.content.title}</h1>
      <p className={styles.PostDiscussion__body}>{post.content.body}</p>
      <CommunityPost id={post.id} isMarker={post.marker !== undefined} content={post.content} user={post.user.userName} replies={post.replies} />
      {post.replies.map((reply: Reply, index: number) => (
        <CommunityPost key={index} id={reply.id} isMarker={false} content={{ title: 'Reply', body: reply.content }} user={reply.user.userName} replies={[]} />
      ))}
      <form onSubmit={handleReplySubmit} className={styles.PostDiscussion__replyForm}>
        <input type="text" value={newReply} onChange={handleReplyChange} className={styles.PostDiscussion__replyForm__input} />
        <button type="submit" className={styles.PostDiscussion__replyForm__button}>Post Reply</button>
      </form>
    </div>
  );
};

export default PostDiscussion;