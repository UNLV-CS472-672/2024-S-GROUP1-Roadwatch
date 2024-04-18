import { useState } from 'react';
import styles from './Community.module.scss';
import { CommunityCard, Navbar, TextField } from '@/components';
import { useGetAllCommunitiesQuery } from '@/store';

export default function Community(): JSX.Element {
  const [search, setSearch] = useState('');
  const { data: communitie, isLoading } = useGetAllCommunitiesQuery();

  const communities = communitie?.concat([
    {
      id: '73891',
      name: 'extra',
      address: { street: 'extraStreet', city: 'las', state: 'NV', zip: '12' },
      users: [],
      radius: 6,
      longitude: 1,
      latitude: 2,
    },
  ]);

  return (
    <div className={styles['Community']}>
      <h1 className={styles['Header']}>Communities</h1>
      <TextField header="Search" setInputValue={setSearch} />

      {communities && !isLoading && (
        <div className={styles['Communities']}>
          {search !== ''
            ? communities
                .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
                .map((c) => (
                  <CommunityCard
                    key={c.id}
                    name={c.name}
                    street={c.address.street}
                    users={c.users || []}
                    onClick={() => {
                      console.log('redirect to specific community');
                    }}
                  />
                ))
            : communities.map((c) => (
                <CommunityCard
                  key={c.id}
                  name={c.name}
                  street={c.address.street}
                  users={c.users || []}
                  onClick={() => {
                    console.log('redirect to specific community');
                  }}
                />
              ))}
        </div>
      )}
      <Navbar />
    </div>
  );
}
