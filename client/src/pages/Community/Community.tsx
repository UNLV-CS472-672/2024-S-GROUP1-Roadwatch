import { useState } from 'react';
import styles from './Community.module.scss';
import { CommunityCard, Navbar, TextField } from '@/components';
import { useGetAllCommunitiesQuery } from '@/store';

export default function Community(): JSX.Element {
  const [search, setSearch] = useState('');
  const { data: communities, isLoading } = useGetAllCommunitiesQuery();

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
                    street={c.street}
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
                  street={c.street}
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
