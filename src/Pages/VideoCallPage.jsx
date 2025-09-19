import React from 'react'
import VideoCall from '../components/communication/VideoCall'

const VideoCallPage = ({contact}) => {
  return (
    <div>
      <VideoCall contact={contact}/>
    </div>
  )
}

export default VideoCallPage
