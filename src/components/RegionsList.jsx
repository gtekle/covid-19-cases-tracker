import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';

const RegionsList = (props) => {
  const { regions } = props;
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  console.log(params);
  return (
    <div>
      RegionsList:
      <p>{pathname}</p>
      <button
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <ul>
        {
          regions.map((region) => (
            <Link key={region.id} to={`${region.id}`}>
              {region.name}
            </Link>
          ))
        }
      </ul>
    </div>
  );
};

RegionsList.propTypes = {
  regions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })).isRequired,
};

export default RegionsList;
