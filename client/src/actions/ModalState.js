
export const modalStateOff = ()=> {
    return {type: 'MODALSTATE', data: false}
}

export const modalStateOn = ()=>{
    return {type: 'MODALSTATE', data: true}
}

export const modalTweetOn = ()=>{
    return {type: 'MODALSTATE', data: {tweet: true}}
}


export const modalStateComment = (post)=>{
    return {type: 'MODALCOMMENT', data: {active: 'modalCommentOn', post}}
}