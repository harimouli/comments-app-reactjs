import './index.css'

const CommentItem = props => {
  const {
    eachComment,
    formatDistanceToNow,
    isLikedtheComment,
    deleteTheComment,
  } = props
  const {name, comment, date, isLiked, initialClassName, id} = eachComment
  const profile = `profile-icon ${initialClassName}`
  const initail = name[0]
  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likeText = isLiked ? 'light-blue' : ''
  const likeTheComment = () => {
    isLikedtheComment(id)
  }
  const deleteComment = () => {
    deleteTheComment(id)
  }
  return (
    <li className="comment-card">
      <div className="inner-container">
        <div className="info-container">
          <p className={profile}>{initail}</p>
        </div>
        <div className="text-container">
          <div className="name-time-container">
            <p className="name">{name}</p>
            <span className="time">{formatDistanceToNow(date)}</span>
          </div>
          <p>{comment}</p>
        </div>
      </div>
      <div className="like-delete-container" onClick={likeTheComment}>
        <button className="button">
          <img src={likeUrl} className="onclick-buttons" alt="like" />
        </button>
        <p className={`like ${likeText}`}>Like</p>
        <button className="button" onClick={deleteComment} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="onclick-buttons"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
