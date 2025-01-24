import React from 'react'

const UserViewCards = ({data}) => {
  // console.log(data)
  return (
    <div className="">
      <div className="card bg-base-200 w-96 shadow-xl">
        <figure>
          <img
            src={data?.photoUrl}
            alt="image"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data?.firstName}</h2>
          <p>{data?.about}</p>
          <p>
            {data?.age},{data?.gender}
          </p>
        
        </div>
      </div>
    </div>
  );
}

export default UserViewCards
