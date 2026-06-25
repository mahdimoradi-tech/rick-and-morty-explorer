import {BlinkBlur} from 'react-loading-indicators'

function Loader() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
      <p style={{display: 'inline-block', fontSize: '1.2rem'}}>Loading, Please wait...</p>
      <BlinkBlur color="#32cd32" size="small" text="" textColor="" />
    </div>

  )
}

export default Loader