import { formatDistanceToNow } from "date-fns"

const displayDate = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true})
}

export default displayDate