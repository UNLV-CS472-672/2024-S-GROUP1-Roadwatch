import styles from './CommunityX.module.scss';
import { CommunityPost, CreatePost} from '@/components';
import { IconButton } from '@mui/material';
import { ArrowBackIos } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

/**
 *  This function displays the CommunityX page. CommunityX is the specific community that a user selects to interact with.
 */
export default function CommunityX(): JSX.Element {

    // replace this to get the posts corresponding to the community
    // This is dummy data for now!!!
    const postArray = [
        {
            /** Boolean which tells if its a marker post or text post*/
            isMarker: true,
            /** Content of the post, Title and Body */
            content: {title: "Post1",body: "Body1"},
            /** User information of post creater */
            user: "User1", //change this to our user. 
            /** If marker post, pass in the marker information */
            marker:{
                longitude: 123123,
                latitude: 431123,
                type: "pothole"
            }
        },
        {
            /** Boolean which tells if its a marker post or text post*/
            isMarker: false,
            /** Content of the post, Title and Body */
            content: {title: "Post3",body: "Body3"},
            /** User information of post creater */
            user: "User3", //change this to our user. 
        },
        {
            /** Boolean which tells if its a marker post or text post*/
            isMarker: true,
            /** Content of the post, Title and Body */
            content: {title: "Post2",body: "Body2"},
            /** User information of post creater */
            user: "User2", //change this to our user. 
            /** If marker post, pass in the marker information */
            marker:{
                longitude: 432432,
                latitude: 928392,
                type: "RoadDamage"
            }
        },
        {
            /** Boolean which tells if its a marker post or text post*/
            isMarker: false,
            /** Content of the post, Title and Body */
            content: {title: "Post4",body: "Body4"},
            /** User information of post creater */
            user: "User4", //change this to our user. 
        },
    ]

    const navigate = useNavigate(); 

    // Function for the back button, which returns to the community tab
    const returnToCommunity = () =>{
        navigate('/community');
    }

  return (
    <div className={styles['CommunityX']}>
        <div className={styles['CommunityX__header']}>
            <div className={styles['CommunityX__backButton']}>
                <IconButton edge="start" color="inherit" aria-label="back">
                    <ArrowBackIos onClick={returnToCommunity}/>
                </IconButton>
            </div>
            <div className={styles['CommunityX__name']}>
                {/* Replace this with the actual community name */}
                Community X
            </div>
        </div>
        <div className={styles['CommunityX__body']}>
            <div className={styles['CommunityX__map']}>
                {/* Replace with the map */}
                Map
            </div>
            <div className={styles['CommunityX__users']}>
                {/* Replace with users */}
                Users
            </div>
            <div className={styles['CommunityX_showPosts']}>
            {postArray.map((e,index) => (
                <CommunityPost 
                    key={index} 
                    id={index.toString()} // not 100% sure if correct
                    isMarker={e.isMarker} 
                    content={e.content} 
                    user={e.user}
                    replies={[]}
                />
            ))}
            </div>
            
        </div>
        <div className={styles['CommunityX__createPostButton']}>
            <CreatePost/>
        </div>
    </div>
  );
}
