/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import styles from './CommunityCard.module.scss';
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardActions,
  Stack,
  Typography,
} from '@mui/material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { red, blue, orange } from '@mui/material/colors';
import communityImage from '../../assets/Updated_RoadWatch_Logo.svg';

interface CommunityCardProps {
  name: string;
  street: string;
  users: string[];
  onClick: () => void;
}

export default function CommunityCard({
  name,
  street,
  users,
  onClick,
}: CommunityCardProps): JSX.Element {
  const first3Users = users.slice(0, 3);

  return (
    <div className={styles['CommunityCard']} onClick={onClick}>
      <Card>
        <CardContent>
          <Stack direction="row">
            <div>
              <Typography variant="h4" gutterBottom>
                {name}
              </Typography>
              <br />
              <Typography>
                <FmdGoodIcon className={styles['CommunityCard__VerticalCenter']} />
                {street}, USA
              </Typography>
              <CardActions disableSpacing>
                <AvatarGroup max={3} spacing="small">
                  {first3Users.map((name) => (
                    <Avatar key={name} sx={{ bgcolor: red[500] }}>
                      {name[0].toUpperCase()}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Stack>
                  <Typography className={styles['CommunityCard__NumberOfPeople']}>
                    {users.length}
                  </Typography>
                  <Typography
                    className={styles['CommunityCard__PeopleNames']}
                    color="text.secondary"
                  >
                    {first3Users.toString() ? first3Users.toString() : 'No One In Community'}
                  </Typography>
                </Stack>
              </CardActions>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={communityImage}
                alt="Displaying location for the Community Page"
                className={styles['CommunityCard__CommunityImage']}
              />
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
