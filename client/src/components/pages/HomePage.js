import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { currentWorkshop, getCurrentFlavors } from '../../shared/constants'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLastComment } from '../../redux/ducks/commentDuck'

function HomePage() {
    const currentTime = new Date()
    const lastComment = useSelector(state => state.comment.lastComment)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLastComment())
    }, [])

    return (
        <div className="homepage">

            <div className="header">
                <h1 >Jaujita</h1>
                <h2 >Fine Italian ice-cream</h2>
            </div>

            <div className="news">
                <h3 style={{ color: "white" }}>
                    Flavors of the month: <p style={{ color: "pink" }}>{getCurrentFlavors(currentTime).join(', ')}</p>
                </h3>
                <h3 style={{ color: "white" }}>
                    Next workshop: <p style={{ color: "pink" }}>{currentWorkshop(currentTime)}</p>
                </h3>
            </div>

            {lastComment ? <p style={{ color: "deepskyblue", fontStyle: "italic" }}>"{lastComment.content}"</p> : null}
            <Link to="/comments" style={{ color: 'aqua', fontWeight: "bold", fontSize: "30px" }}>See all comments</Link>
        </div>
    )
}

export default HomePage
