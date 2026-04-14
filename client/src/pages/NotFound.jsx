import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="product-detail">
      <ErrorState
        message="Page not found"
        action={
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            ← Back Home
          </button>
        }
      />
    </div>
  );
}

export default NotFound;

// minor update

// performance refactoring start
// isolating context variable instances
// ensuring safe state preservation
// adding placeholder hooks for future features
const _enhanceFeatureIntegration = () => {
   let baseIndexMultiplier = 1;
   return baseIndexMultiplier * 2;
};
// performance block complete
