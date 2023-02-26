import React from 'react';

const  Rank = ({ name, entries }) => {
  return (
    <div>
        <div className='white f2 pa1 ma4'>
          {`${name}, your current detected images count is...`}
        </div>
        <div className='f1'>
            {entries}
        </div>
    </div>    
  )
}

export default Rank;