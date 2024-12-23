import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'
import './index.css'
import CommentItem from '../CommentItem'
import {v4 as uuidv4} from 'uuid'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    commentsCount: 0,
    name: '',
    comment: '',
  }
  onChangeName = event => {
    this.setState({name: event.target.value})
  }
  onChangeTextArea = event => {
    this.setState({comment: event.target.value})
  }
  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      commentsCount: prevState.commentsCount + 1,
      name: '',
      comment: '',
    }))
  }
  isLikedtheComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }
  deleteTheComment = id => {
    const {commentsList} = this.state
    const filteredList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({
      commentsList: filteredList,
      commentsCount: filteredList.length,
    })
  }
  render() {
    const {commentsCount, commentsList, name, comment} = this.state
    return (
      <div className="app-container">
        <h1 className="main-heading">Comments</h1>
        <div className="comments-container">
          <div className="comments-input-container">
            <p>Say somethings about 4.0 Technologies</p>
            <form onSubmit={this.onAddComment}>
              <input
                className="comment-input"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={this.onChangeName}
              />
              <br />
              <textarea
                className="comment-textarea"
                placeholder="Your Comment"
                rows="7"
                value={comment}
                onChange={this.onChangeTextArea}
              ></textarea>
              <br />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
          </div>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
        </div>
        <hr className="hr2" />
        <p className="comments-count">
          <span className="count">{commentsCount}</span> Comments
        </p>
        <ul className="comments-section">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              formatDistanceToNow={formatDistanceToNow}
              eachComment={eachComment}
              isLikedtheComment={this.isLikedtheComment}
              deleteTheComment={this.deleteTheComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
