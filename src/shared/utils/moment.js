import moment from 'moment-timezone'

export const TIME_ZONE = 'Asia/Ho_Chi_Minh'
export const DateFormat = 'YYYY-MM-DD'

moment.tz(TIME_ZONE).format()

export default moment
