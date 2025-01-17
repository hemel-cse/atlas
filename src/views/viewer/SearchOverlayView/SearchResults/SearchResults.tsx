import styled from '@emotion/styled'
import React, { useMemo, useState } from 'react'

import { useSearch } from '@/api/hooks'
import { AssetAvailability, SearchQuery } from '@/api/queries'
import { ChannelGrid } from '@/components/ChannelGrid'
import { SkeletonLoaderVideoGrid } from '@/components/SkeletonLoaderVideoGrid'
import { VideoGrid } from '@/components/VideoGrid'
import { ViewErrorFallback } from '@/components/ViewErrorFallback'
import { ViewWrapper } from '@/components/ViewWrapper'
import { usePersonalDataStore } from '@/providers/personalData'
import { Tabs } from '@/shared/components/Tabs'
import { sizes } from '@/shared/theme'
import { SentryLogger } from '@/utils/logs'

import { AllResultsTab } from './AllResultsTab'
import { EmptyFallback } from './EmptyFallback'

type SearchResultsProps = {
  query: string
}
const tabs = ['all results', 'videos', 'channels']

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { data, loading, error } = useSearch(
    {
      text: query,
      limit: 50,
      whereVideo: {
        mediaAvailability_eq: AssetAvailability.Accepted,
        thumbnailPhotoAvailability_eq: AssetAvailability.Accepted,
      },
      whereChannel: {},
    },
    { onError: (error) => SentryLogger.error('Failed to fetch search results', 'SearchResults', error) }
  )

  const getChannelsAndVideos = (loading: boolean, data: SearchQuery['search'] | undefined) => {
    if (loading || !data) {
      return { channels: [], videos: [] }
    }
    const results = data
    const videos = results.flatMap((result) => (result.item.__typename === 'Video' ? [result.item] : []))
    const channels = results.flatMap((result) => (result.item.__typename === 'Channel' ? [result.item] : []))
    return { channels, videos }
  }

  const { channels, videos } = useMemo(() => getChannelsAndVideos(loading, data), [loading, data])
  const updateRecentSearches = usePersonalDataStore((state) => state.actions.updateRecentSearches)

  const handleVideoClick = (id: string) => {
    updateRecentSearches(id, 'video')
  }
  const handleChannelClick = (id: string) => {
    updateRecentSearches(id, 'channel')
  }
  if (error) {
    return <ViewErrorFallback />
  }

  if (!loading && channels.length === 0 && videos.length === 0) {
    return <EmptyFallback />
  }

  const mappedTabs = tabs.map((tab) => ({ name: tab }))

  return (
    <ViewWrapper>
      <Container>
        <Tabs tabs={mappedTabs} onSelectTab={setSelectedIndex} initialIndex={0} />
        {selectedIndex === 0 && (
          <AllResultsTab
            key={query}
            loading={loading}
            videos={videos}
            channels={channels}
            onVideoClick={handleVideoClick}
            onChannelClick={handleChannelClick}
          />
        )}
        {selectedIndex === 1 &&
          (loading ? (
            <SkeletonLoaderVideoGrid />
          ) : (
            <VideoGrid videos={videos} onVideoClick={handleVideoClick} onChannelClick={handleChannelClick} />
          ))}
        {selectedIndex === 2 &&
          (loading ? (
            <SkeletonLoaderVideoGrid />
          ) : (
            <ChannelGrid channels={channels} repeat="fill" onChannelClick={handleChannelClick} />
          ))}
      </Container>
    </ViewWrapper>
  )
}

const Container = styled.div`
  margin: ${sizes(4)} 0;

  > * {
    margin-bottom: ${sizes(12)};
  }
`
