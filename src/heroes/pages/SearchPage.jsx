import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components"
import { getHeroByName } from "../helpers";

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = ''} = queryString.parse( location.search );
  
  const heroes = getHeroByName(q);

  const showSearch = (q.length === 0);
  const showError = !showSearch && heroes.length===0
  const { searchText , onInputChange } = useForm({
      searchText:q,
  });




  const onSearchSubmit = ( ( event ) => {
    event.preventDefault();
    // if ( searchText.trim().length <= 1 ) return;
    navigate(`?q=${searchText.toLowerCase().trim()}`)

  })
  return (
    <>
      <h1>Busqueda</h1>
      <hr />

      <div className="row">

        <div className="col-5">
          <h4>Heroe a buscar: </h4>
          <form onSubmit={onSearchSubmit}>
            <input 
              type="text" 
              name="searchText" 
              placeholder="Busca un Heroe"
              className="form-control"
              autoComplete="off"
              value = {searchText}
              onChange={onInputChange}
              
            />
            <button className="btn btn-outline-primary mt-3">Buscar</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          {/* {
            ( q === '' )
            ?<div className="alert alert-primary">Buscar un heroe</div>
            : ( heroes.length === 0 ) && <div className="alert alert-danger">El heroe <b> {q} </b> No se encontró</div>
            
          } */}

          {/* <div className="alert alert-primary" style={{display: q !== '' ? 'none' : '' }}>Buscar un heroe</div> */}
          <div className="alert alert-primary animate__animated animate__fadeIn" style={{ display: showSearch ? '' : 'none' }}>Buscar un heroe</div>
          <div className="alert alert-danger animate__animated animate__fadeIn" style={{ display: showError ? '' : 'none' }}>El heroe <b> {q} </b> No se encontró</div>


          {
          heroes.map ( hero => (
            <HeroCard key= {hero.id} {...hero} />
          ))
          
          }
          {/* <HeroCard /> */}


        </div>

      </div>
    </>
  )
}


