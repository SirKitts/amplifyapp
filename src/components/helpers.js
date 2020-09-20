import React from "react";

export const add0 = n => {
  const num = (n === 0) ? '0' : n
  return (num && num.toString().length === 1) ? '0' + num : num
}

export const calculateTimeDifference = endTime => {
  const expiredTime = new Date(endTime.endDateTime).getTime()
  const currentTime = new Date().getTime()

  let diff = expiredTime - currentTime
  if (diff > 0) {
    return [
      Math.floor(diff / (1000 * 60 * 60 * 24)),
      Math.floor((diff / (1000 * 60 * 60)) % 24),
      Math.floor((diff / 1000 / 60) % 60),
      Math.floor((diff / 1000) % 60)
    ]
  }
  return []
}

export const setDate = dateString => {
  if (dateString === '') {
    const [day, month, year] = new Date().toLocaleDateString().split('/')
    let newDate = [year, month, day].join('-')
    let newTime = new Date().toLocaleTimeString()
    return [newDate, newTime].join(' ')
  }
  return dateString
}
