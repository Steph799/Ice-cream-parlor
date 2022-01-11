import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router'
import Comment from '../Comments/Comment'
import { useSelector, useDispatch } from 'react-redux'
import { fetchComments } from '../../redux/ducks/commentDuck'

function Comments() {
    const navigate = useNavigate()
    const commentsState = useSelector(state => state.comment)
    const dispatch = useDispatch()

    useEffect(() => {dispatch(fetchComments())}, [])

    return (
        <div style={{ marginBottom: '1rem' }}>
            <h1>Comments</h1>
            <Button variant="contained" style={{ margin: "1rem" }} onClick={() => navigate('/yourcomment')}>Add comment</Button>
            {commentsState.loading ? <h2>Loading...</h2> : commentsState.error ? <h2>{commentsState.error}</h2> : (
                <div >
                    {commentsState?.comments?.map(({ _id, title, name, date, content, rate }) =>
                        <Comment key={_id} title={title} name={name} date={date} rate={rate} content={content} />)} 
                </div>
            )}
        </div>
    )
}

export default Comments
