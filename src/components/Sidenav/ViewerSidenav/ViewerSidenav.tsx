import React, { useState } from 'react'

import { NavItemType, SidenavBase } from '@/components/Sidenav/SidenavBase'
import { absoluteRoutes } from '@/config/routes'
import { usePersonalDataStore } from '@/providers/personalData'
import { Button } from '@/shared/components/Button'
import { SvgGlyphExternal, SvgNavChannels, SvgNavHome, SvgNavNew, SvgNavPopular } from '@/shared/icons'
import { openInNewTab } from '@/utils/browser'
import { ConsoleLogger } from '@/utils/logs'

import { FollowedChannels } from './FollowedChannels'

const viewerSidenavItems: NavItemType[] = [
  {
    icon: <SvgNavHome />,
    name: 'Home',
    to: absoluteRoutes.viewer.index(),
  },
  {
    icon: <SvgNavPopular />,
    name: 'Popular',
    to: absoluteRoutes.viewer.popular(),
  },
  {
    icon: <SvgNavNew />,
    name: 'New',
    to: absoluteRoutes.viewer.new(),
  },
  {
    icon: <SvgNavChannels />,
    name: 'Channels',
    to: absoluteRoutes.viewer.channels(),
  },
]

export const ViewerSidenav: React.FC = () => {
  const [expanded, setExpanded] = useState(false)
  const followedChannels = usePersonalDataStore((state) => state.followedChannels)
  const updateChannelFollowing = usePersonalDataStore((state) => state.actions.updateChannelFollowing)

  const handleChannelNotFound = (id: string) => {
    ConsoleLogger.warn(`Followed channel not found, removing id: ${id}`)
    updateChannelFollowing(id, false)
  }

  return (
    <SidenavBase
      expanded={expanded}
      toggleSideNav={setExpanded}
      items={viewerSidenavItems}
      additionalContent={
        <FollowedChannels
          onClick={() => setExpanded(false)}
          onChannelNotFound={handleChannelNotFound}
          followedChannels={followedChannels}
          expanded={expanded}
        />
      }
      buttonsContent={
        <>
          <Button
            variant="secondary"
            onClick={() => {
              setExpanded(false)
              openInNewTab(absoluteRoutes.studio.index(), true)
            }}
            icon={<SvgGlyphExternal />}
          >
            Joystream studio
          </Button>
        </>
      }
    />
  )
}
