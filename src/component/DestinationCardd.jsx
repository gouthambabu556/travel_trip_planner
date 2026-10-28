
// import React from "react";
// import { Link } from "react-router-dom";

// function DestinationCardd({ destination, favorite, onToggleFavorite }) {
//   return (
//     <div className="destination-card">
//       <div className="destination-image">
//         <img
//           src={destination.image}
//           alt={destination.name}
//           loading="lazy"
//         />

//         <button
//           className={`favorite-btn ${favorite ? "active" : ""}`}
//           onClick={() => onToggleFavorite(destination.id)}
//           aria-label={favorite ? "Remove favorite" : "Add favorite"}
//           title={favorite ? "Remove favorite" : "Add favorite"}
//         >
//           {favorite ? "♥" : "♡"}
//         </button>

//         <span className="category-badge">
//           {destination.category}
//         </span>
//       </div>

//       <div className="destination-info">
//         <p className="destination-location">
//           📍 {destination.location}
//         </p>

//         <h3>{destination.name}</h3>

//         <p className="destination-description">
//           {destination.description}
//         </p>

//         <div className="destination-footer">
//           <div>
//             <span className="muted">Estimated cost</span>
//             <h4>₹{destination.cost.toLocaleString("en-IN")}</h4>
//           </div>

//           <Link to="/explore" className="small-button">
//             Explore →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DestinationCardd;


import React from "react";
import { Link } from "react-router-dom";

function DestinationCardd({ destination, favorite, onToggleFavorite }) {
  return (
    <div className="destination-card">
      <div className="destination-image">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />

        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(destination.id)}
          aria-label={favorite ? "Remove favorite" : "Add favorite"}
          title={favorite ? "Remove favorite" : "Add favorite"}
        >
          {favorite ? "♥" : "♡"}
        </button>

        <span className="category-badge">
          {destination.category}
        </span>
      </div>

      <div className="destination-info">
        <p className="destination-location">
          📍 {destination.location}
        </p>

        <h3>{destination.name}</h3>

        <p className="destination-description">
          {destination.description}
        </p>

        <div className="destination-footer">
          <div>
            <span className="muted">Estimated cost</span>
            <h4>₹{destination.cost.toLocaleString("en-IN")}</h4>
          </div>

          <Link
            to={`/trips/new?destination=${destination.id}`}
            className="small-button"
          >
            Plan trip →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DestinationCardd;
