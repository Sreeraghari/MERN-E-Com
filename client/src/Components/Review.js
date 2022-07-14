import React from 'react'

function Review({ value, text }) {
    return (
        <div>
            {/* <i className={ value>=2?"fa-solid fa-star":value>=1.5?"fa-solid fa-star-half":"fa-solid fa-star"}/>
            <i className={ value>=3?"fa-solid fa-star":value>=2.5?"fa-solid fa-star-half":"fa-solid fa-star"}/>
            <i className={ value>=4?"fa-solid fa-star":value>=3.5?"fa-solid fa-star-half":"fa-solid fa-star"}/>
            <i className={ value>=5?"fa-solid fa-star":value>=4.5?"fa-solid fa-star-half":"fa-solid fa-star"}/> */}

            <span>
                <i className={value >= 1 ? "fa-solid fa-star" : value >= 0.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"} />
            </span>

            <span>
                <i className={value >= 2 ? "fa-solid fa-star" : value >= 1.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"} />
            </span>

            <span>
                <i className={value >= 3 ? "fa-solid fa-star" : value >= 2.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"} />
            </span>

            <span>
                <i className={value >= 4 ? "fa-solid fa-star" : value >= 3.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"} />
            </span>

            <span>
                <i className={value >= 5 ? "fa-solid fa-star" : value >= 4.5 ? "fa-solid fa-star-half" : "fa-regular fa-star"} />
            </span>

            <span>
                {text}
            </span>

        </div>
    )
}

export default Review