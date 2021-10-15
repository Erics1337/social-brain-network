import Post from './Post'

const posts = [
    {
        id: '123',
        username: 'don__swan',
        userImg: 'https://avatars.githubusercontent.com/u/24712956?v=4',
        img: 'https://avatars.githubusercontent.com/u/24712956?v=4',
        caption: 'Subscribe'
    },
    {
        id: '123',
        username: 'don__swan',
        userImg: 'https://avatars.githubusercontent.com/u/24712956?v=4',
        img: 'https://avatars.githubusercontent.com/u/24712956?v=4',
        caption: 'Subscribe'
    },
    {
        id: '123',
        username: 'don__swan',
        userImg: 'https://avatars.githubusercontent.com/u/24712956?v=4',
        img: 'https://avatars.githubusercontent.com/u/24712956?v=4',
        caption: 'Subscribe'
    },
]

function Posts() {
    return (
        <div>
            {posts.map((post) => (
                <Post key={post.id} id={post.id} username={post.username} userImg={post.userImg} img={post.img} caption={post.caption} />
            ))}
        </div>
    )
}

export default Posts

