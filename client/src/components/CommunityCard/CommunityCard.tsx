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

export default function CommunityCard(): JSX.Element {
  return (
    <div className={styles['CommunityCard']}>
      <Card>
        <CardContent>
          <Stack direction="row">
            <div>
              <Typography variant="h4" gutterBottom>
                Community 1
              </Typography>
              <br />
              <Typography>
                <FmdGoodIcon sx={{ verticalAlign: 'middle' }} />
                123 street, USA
              </Typography>
              <CardActions disableSpacing>
                <AvatarGroup max={3} spacing="small">
                  <Avatar sx={{ bgcolor: red[500] }}>K</Avatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>J</Avatar>
                  <Avatar sx={{ bgcolor: orange[500] }}>P</Avatar>
                </AvatarGroup>
                <Stack>
                  <Typography sx={{ pl: 1, fontWeight: 'medium' }}>3 people</Typography>
                  <Typography sx={{ pl: 1 }} color="text.secondary">
                    Keiko, Jason, and Peter
                  </Typography>
                </Stack>
              </CardActions>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img
                src={communityImage}
                alt="Community Image"
                style={{ width: '200px', height: '200px', marginRight: '10px' }}
              />
            </div>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}

