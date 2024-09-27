import React from 'react'

const UserCards = ({data}) => {
  return (
    <div>
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
          <p>{data?.age},{data?.gender}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCards
