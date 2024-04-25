import { useState } from 'react';
import styles from './Community.module.scss';
import { CommunityCard, Navbar, TextField } from '@/components';
import { useGetAllCommunitiesQuery } from '@/store';
import { useNavigate } from 'react-router-dom';

export default function Community(): JSX.Element {
  const [search, setSearch] = useState('');
  const { data: communities, isLoading } = useGetAllCommunitiesQuery();
  const navigate = useNavigate();

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
                      navigate(`./${c.id}`, { state: { community: c } });
                    }}
                  />
                ))
            : communities.map((c) => (
                <CommunityCard
                  key={c.id}
                  name={c.name}
                  street={c.street}
                  users={c.users || []}
                  onClick={() => navigate(`./${c.id}`, { state: { community: c } })}
                />
              ))}
        </div>
      )}
      <Navbar />
    </div>
  );
}
