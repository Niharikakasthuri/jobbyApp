import {BsSearch} from 'react-icons/bs'

// eslint-disable-next-line import/extensions
import ProfileDetails from '../ProfileDetails'
import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props
    return (
      <div>
        <input
          type="search"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        {/* eslint-disable-next-line */}
        <button type="button" id="searchButton" onClick={getJobs}>
          <BsSearch />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div>
        <h1> Type of Employment</h1>
        <ul>
          {employmentTypesList.map(eachEmployeeType => {
            const {changeEmployeeList} = props
            const onSelectEmployeeType = event => {
              changeEmployeeList(event.target.value)
            }
            return (
              <li
                key={eachEmployeeType.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachEmployeeType.employmentTypeId}
                  value={eachEmployeeType.employmentTypeId}
                />
                <label htmlFor={eachEmployeeType.employmentTypeId}>
                  {eachEmployeeType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props
    return (
      <div>
        <h1>Salary Range</h1>
        <ul>
          {salaryRangesList.map(eachSalary => {
            const {changeSalary} = props
            const onClickSalary = () => {
              changeSalary(eachSalary.salaryRangeId)
            }
            return (
              <li key={eachSalary.salaryRangeId} onClick={onClickSalary}>
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                />
                <label htmlFor={eachSalary.salaryRangeId}>
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div>
      {renderSearchInput()}
      <ProfileDetails />
      <hr />
      {renderTypeOfEmployment()}
      <hr />
      {renderSalaryRange()}
    </div>
  )
}
export default FiltersGroup
