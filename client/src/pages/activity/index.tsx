import Taro, { Component, Config, useEffect } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import { IUserReceivedEvent, getUserEvents } from "../../services/users"
import Empty from "../../components/empty"
import ActivityItem from "./activity-item"
import NavBar from "../../components/navbar"
import { getGlobalData } from "../../utils/global_data"
import { IUserInfo } from "../../services/user"
import useRequestWIthMore from "../../hooks/useRequestWIthMore"

const Activity = () => {
  const userInfo = getGlobalData("userInfo") as IUserInfo
  const [eventsData, refresh] = useRequestWIthMore<IUserReceivedEvent>(
    userInfo.login!,
    getUserEvents
  )

  return (
    <View>
      <NavBar title="Activity"></NavBar>
      {eventsData ? (
        eventsData.map(item => {
          return <ActivityItem item={item} key={item.id}></ActivityItem>
        })
      ) : (
        <Empty></Empty>
      )}
    </View>
  )
}

export default Activity