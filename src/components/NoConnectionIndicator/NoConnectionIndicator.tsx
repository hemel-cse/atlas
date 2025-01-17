import React from 'react'
import { CSSTransition } from 'react-transition-group'

import { ConnectionStatus } from '@/providers/connectionStatus'
import { Text } from '@/shared/components/Text'
import { SvgAlertWarning } from '@/shared/icons'
import { transitions } from '@/shared/theme'

import { IconWrapper, IndicatorWrapper, TextWrapper } from './NoConnectionIndicator.style'

export type NoConnectionIndicatorProps = {
  nodeConnectionStatus: ConnectionStatus
  isConnectedToInternet: boolean
}

export const NoConnectionIndicator: React.FC<NoConnectionIndicatorProps> = ({
  nodeConnectionStatus,
  isConnectedToInternet,
}) => {
  return (
    <CSSTransition
      in={nodeConnectionStatus === 'disconnected' || !isConnectedToInternet}
      timeout={200}
      classNames={transitions.names.fade}
      mountOnEnter
      unmountOnExit
    >
      <IndicatorWrapper>
        <IconWrapper>
          <SvgAlertWarning />
        </IconWrapper>
        <TextWrapper>
          {!isConnectedToInternet ? (
            <Text variant="subtitle2">No network connection</Text>
          ) : (
            nodeConnectionStatus === 'disconnected' && <Text variant="body2">No node connection</Text>
          )}
          <Text variant="body2" secondary>
            Wait for connection to restore
          </Text>
        </TextWrapper>
      </IndicatorWrapper>
    </CSSTransition>
  )
}
