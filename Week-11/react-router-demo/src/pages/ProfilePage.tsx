import React, { use } from 'react'

import { useParams, useLoaderData } from 'react-router'

const ProfilePage = () => {
    const { userId} = useParams();
    const data = useLoaderData()
  return (
    <div> <h1>Profile Page {userId}</h1>
    <h2>User Info: {data.userInfo.name}</h2>
    </div>
  )
}

export default ProfilePage