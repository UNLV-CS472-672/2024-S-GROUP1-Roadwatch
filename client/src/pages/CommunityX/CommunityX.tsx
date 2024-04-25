import styles from './CommunityX.module.scss';
import { CommunityPost, CreatePost } from '@/components';
import { IconButton } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { ICommunity } from '@/types';
import { useGetCommunityPostsQuery } from '@/store/post';

/**
 *  This function displays the CommunityX page. CommunityX is the specific community that a user selects to interact with.
 */
export default function CommunityX(): JSX.Element {
  const routerLocation = useLocation(); // react router location
  const navigate = useNavigate();
  const state = routerLocation.state as { community: ICommunity };
  const {
    community: { id, name, users },
  } = state;

  const { data: posts, isLoading } = useGetCommunityPostsQuery(id);

  // Function for the back button, which returns to the community tab
  const returnToCommunity = () => {
    navigate('/community');
  };

  const userString = users.join(', ');
  if (userString.length >= 10) {
    userString.substring(0, 10);
    userString.concat('...');
  }

  return (
    <div className={styles['CommunityX']}>
      <div className={styles['CommunityX__header']}>
        <div className={styles['CommunityX__backButton']}>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBackIos onClick={returnToCommunity} />
          </IconButton>
        </div>
        <div className={styles['CommunityX__name']}>{`${name} Community`}</div>
      </div>
      <div className={styles['CommunityX__body']}>
        <div className={styles['CommunityX__users']}>{userString}</div>
        {posts && !isLoading && (
          <div className={styles['CommunityX_showPosts']}>
            {posts.map((p) => (
              <CommunityPost
                key={p._id}
                id={p._id || ''}
                isMarker={p.type === 'marker'}
                content={p.content}
                user={p.user.userName}
                marker={p.marker}
                replies={[]}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles['CommunityX__createPostButton']}>
        <CreatePost communityId={id} />
      </div>
    </div>
  );
}
