import React, { useMemo } from 'react'

import { useChannels, useVideos } from '@/api/hooks'
import { usePersonalDataStore } from '@/providers/personalData'
import { Text } from '@/shared/components/Text'
import { createLookup } from '@/utils/data'

import { Container, SearchesList, Title } from './RecentSearches.style'
import { RecentChannelCard, RecentVideoTile } from './previews'

type IdsLookup = {
  videoIds: string[]
  channelIds: string[]
}

export const RecentSearches: React.FC = () => {
  const recentSearches = usePersonalDataStore((state) => state.recentSearches)

  const { videoIds, channelIds } = useMemo(() => {
    return recentSearches.reduce(
      (acc, item) => {
        const arr = item.type === 'channel' ? acc.channelIds : acc.videoIds
        arr.push(item.id)
        return acc
      },
      { videoIds: [], channelIds: [] } as IdsLookup
    )
  }, [recentSearches])

  const { videos, error: videosError } = useVideos({ where: { id_in: videoIds } }, { skip: !videoIds.length })
  const { channels, error: channelsError } = useChannels({ where: { id_in: channelIds } }, { skip: !channelIds.length })

  if (videosError) {
    throw videosError
  }

  if (channelsError) {
    throw channelsError
  }

  const videosLookup = useMemo(() => createLookup(videos || []), [videos])
  const channelsLookup = useMemo(() => createLookup(channels || []), [channels])

  return (
    <Container>
      <Title variant="hero">Recent Searches</Title>
      <SearchesList>
        {recentSearches.length ? (
          recentSearches.map((recentSearch) => {
            if (recentSearch.type === 'channel') {
              return <RecentChannelCard key={recentSearch.id} channel={channelsLookup[recentSearch.id]} />
            } else {
              return <RecentVideoTile key={recentSearch.id} video={videosLookup[recentSearch.id]} />
            }
          })
        ) : (
          <Text variant="body1">No recent searches yet</Text>
        )}
      </SearchesList>
    </Container>
  )
}
