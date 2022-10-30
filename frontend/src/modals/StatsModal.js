import React from 'react'

export const StatsModal = ({ onDismiss }) => {
  return (
    <>
      <div className='modal text-center text-white'>
      <div onClick={onDismiss} className="absolute h-full w-full bg-black bg-opacity-40 backdrop-filter backdrop-blur" />
        <div className="z-10 w-96 transform scale-85 sm:scale-100 flex flex-col items-stretch shadow-dark p-5 space-y-7 rounded-xl border border-white border-opacity-20 bg-grey-darkest bg-opacity-20 backdrop-filter backdrop-blur-xl">
          <h2 className='max-h-[3.3rem] mt-11'>User stats</h2>
          <p className='gradientText'> 0x123455612321213</p>
          <div className='stats'>
            <div className='stats__text'>
              Level
            </div>
            <div className='stats__data'>
              08
            </div>
          </div>
          <div className='stats'>
            <div className='stats__text'>
              Badges
            </div>
            <div className='stats__data'>
              15
            </div>
          </div>
          <div className='stats'>
            <div className='stats__text'>
              Activity
            </div>
            <div className='stats__data'>
              High
            </div>
          </div>
          <div className='regularButton'>
            <button className='my-10' onClick={onDismiss} >Close</button>
          </div>
        </div>
    </div>
    </>
  )
}