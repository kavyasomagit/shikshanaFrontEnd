import { Fragment, useEffect, useState } from "react"
import "./singleFilter.css"


export const SingleFilter = (props) => {

    const [filterOptions, setfilterOptions] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 


    var data;
    useEffect(()=> {
        (async () => {
            try {
                data = props.data
                setfilterOptions(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    

    const handleOnClick = async () => {
        setIsFiltersVisible((prev) => !prev);
    }

    const getFilterOptions = (option) => {
        setSelectedCategories(prevOptions => {
            if (prevOptions.includes(option)) {
                return prevOptions.filter(o => o !== option);
            } else {
                return [...prevOptions, option];
            }
        });
    };



    useEffect(() => {
        props.onQueryParametersChange((prev) => {
            const updatedParameters = { ...prev, [props.filter]: selectedCategories };
            return updatedParameters;
        });
    }, [selectedCategories]);


    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredOptions = filterOptions.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
       <Fragment>
        <div className="filterHeader">
        <h3>{props.filter}</h3>
            <button onClick={handleOnClick}>
                    <span className="material-icons-outlined" >
                    {isFiltersVisible ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                    </span>
            </button>
        </div>
        <div style={{ display: isFiltersVisible ? 'block' : 'none' }}>
            <input
                    type="text"
                    placeholder="Search..."
                    className="searchBox"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            <div id="filters" >
            <br/>
                {
                    filteredOptions.map((f) => <label key={f}>
                        <input type="checkbox" value={f} onClick={() => getFilterOptions(f)}/>
                         {f}
                        <br />
                    </label>
                    )
                }
               
            </div>
        </div>
        <br/>
       </Fragment>
    )
}