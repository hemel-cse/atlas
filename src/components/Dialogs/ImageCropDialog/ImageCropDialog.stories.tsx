import styled from '@emotion/styled/'
import { Meta, Story } from '@storybook/react'
import React, { useRef, useState } from 'react'

import { OverlayManagerProvider } from '@/providers/overlayManager'
import { Avatar } from '@/shared/components/Avatar'
import { SkeletonLoader } from '@/shared/components/SkeletonLoader'
import { AssetDimensions, ImageCropData } from '@/types/cropper'

import { ImageCropDialog, ImageCropDialogImperativeHandle, ImageCropDialogProps } from './ImageCropDialog'

export default {
  title: 'General/ImageCropDialog',
  component: ImageCropDialog,
  argTypes: {
    showDialog: { table: { disable: true } },
    imageType: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <OverlayManagerProvider>
        <Story />
      </OverlayManagerProvider>
    ),
  ],
} as Meta

const RegularTemplate: Story<ImageCropDialogProps> = () => {
  const avatarDialogRef = useRef<ImageCropDialogImperativeHandle>(null)
  const thumbnailDialogRef = useRef<ImageCropDialogImperativeHandle>(null)
  const coverDialogRef = useRef<ImageCropDialogImperativeHandle>(null)
  const [avatarImageUrl, setAvatarImageUrl] = useState<string | null>(null)
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)

  const handleAvatarConfirm = (
    blob: Blob,
    url: string,
    _assetDimensions: AssetDimensions,
    _imageCropData: ImageCropData
  ) => {
    setAvatarImageUrl(url)
  }

  const handleThumbnailConfirm = (
    blob: Blob,
    url: string,
    _assetDimensions: AssetDimensions,
    _imageCropData: ImageCropData
  ) => {
    setThumbnailImageUrl(url)
  }

  const handleCoverConfirm = (
    blob: Blob,
    url: string,
    _assetDimensions: AssetDimensions,
    _imageCropData: ImageCropData
  ) => {
    setCoverImageUrl(url)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '24px' }}>
      <Avatar assetUrl={avatarImageUrl} editable onEditClick={() => avatarDialogRef.current?.open()} size="cover" />

      {thumbnailImageUrl ? (
        <Image src={thumbnailImageUrl} onClick={() => thumbnailDialogRef.current?.open()} />
      ) : (
        <ImageSkeletonLoader onClick={() => thumbnailDialogRef.current?.open()} />
      )}
      {coverImageUrl ? (
        <Image src={coverImageUrl} onClick={() => coverDialogRef.current?.open()} />
      ) : (
        <ImageSkeletonLoader onClick={() => coverDialogRef.current?.open()} />
      )}

      <ImageCropDialog imageType="avatar" onConfirm={handleAvatarConfirm} ref={avatarDialogRef} />
      <ImageCropDialog imageType="videoThumbnail" onConfirm={handleThumbnailConfirm} ref={thumbnailDialogRef} />
      <ImageCropDialog imageType="cover" onConfirm={handleCoverConfirm} ref={coverDialogRef} />
    </div>
  )
}
export const Regular = RegularTemplate.bind({})

const ImageSkeletonLoader = styled(SkeletonLoader)`
  width: 600px;
  min-height: 200px;
  cursor: pointer;
`

const Image = styled.img`
  width: 600px;
  cursor: pointer;
`
