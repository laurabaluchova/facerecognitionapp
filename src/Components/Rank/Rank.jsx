import React from 'react';

const  Rank = ({ name, entries, isGoogleUser, module }) => {
  if (isGoogleUser) {
  return (
    <div>
        <div className='white f2 pa1 ma4'>
          {`${name}, detect ${module.name} in your pictures with this Magic Brain App`}
        </div>        
    </div>    
  ) 
  } else {
    let savedName = window.localStorage.getItem('name');
    let savedEntries = window.localStorage.getItem('entries');
    return (
      <div>
          <div className='white f2 pa1 ma4'>
            {`${savedName}, your current detected images count is...`}
          </div>
          <div className='f1'>
              {savedEntries}
          </div>
      </div>    
    ) 
  }
}

export default Rank;