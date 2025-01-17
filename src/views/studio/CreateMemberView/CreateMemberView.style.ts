import styled from '@emotion/styled'

import { LimitedWidthContainer } from '@/components/LimitedWidthContainer'
import { Avatar } from '@/shared/components/Avatar'
import { Button } from '@/shared/components/Button'
import { Text } from '@/shared/components/Text'
import { TextField } from '@/shared/components/TextField'
import { media, sizes } from '@/shared/theme'

export const Header = styled.header`
  margin-bottom: ${sizes(12)};
  max-width: 580px;
  ${media.medium} {
    max-width: 440px;
  }
`

export const Hero = styled(Text)`
  word-break: break-word;
`

export const SubTitle = styled(Text)`
  margin-top: ${sizes(4)};
`

export const Wrapper = styled(LimitedWidthContainer)`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  align-items: center;
  margin-top: 64px;
  padding-bottom: 100px;
  ${media.medium} {
    margin-top: 40px;
    align-items: unset;
    flex-direction: row;
  }
  ${media.xxlarge} {
    margin-top: 64px;
  }
`
export const Form = styled.form`
  position: relative;
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  ${media.medium} {
    display: block;
  }
`
export const StyledTextField = styled(TextField)`
  margin-bottom: ${sizes(5)};
`

export const StyledAvatar = styled(Avatar)`
  margin-bottom: ${sizes(6)};
  width: 104px;
`

export const StyledButton = styled(Button)`
  display: block;
  margin-top: 20px;
  ${media.medium} {
    margin-left: auto;
  }
`
