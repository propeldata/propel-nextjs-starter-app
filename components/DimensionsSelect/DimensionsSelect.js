import CloseIcon from '@mui/icons-material/Close'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'
import styles from './DimensionsSelect.module.css'

const DimensionsSelect = ({ dimensionsList, dimensions, setDimensions }) => {
  const handleDimensionsChange = (event) => {
    const dimensions = event.target.value
    setDimensions(
      typeof dimensions === 'string'
        ? dimensions.split(',').map((columnName) => ({ columnName }))
        : dimensions.map((columnName) => ({ columnName }))
    )
  }

  const handleRemoveDimension = (event, dimensionColumnName) => {
    event.stopPropagation()

    if (dimensions) {
      setDimensions(
        dimensions.filter(
          ({ columnName }) => columnName !== dimensionColumnName
        )
      )
    }
  }

  return (
    <div className={styles.root}>
      <FormControl fullWidth>
        <InputLabel>Dimensions</InputLabel>
        <Select
          onChange={handleDimensionsChange}
          value={dimensions?.map(({ columnName }) => columnName) ?? []}
          label="Dimensions"
          multiple
          sx={{
            '.MuiSelect-select': {
              textAlign: 'left',
              padding: '1em'
            }
          }}
          renderValue={(dimensions) =>
            dimensions.map((dimensionColumnName) => (
              <Chip
                key={dimensionColumnName}
                size="small"
                sx={{ marginRight: '0.2em' }}
                label={
                  <div style={{ paddingLeft: '0.2em' }}>
                    {dimensionColumnName}
                    <IconButton
                      size="small"
                      disableRipple
                      sx={{ paddingRight: 0 }}
                      onMouseDown={(event) =>
                        handleRemoveDimension(event, dimensionColumnName)
                      }
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                }
              />
            ))
          }
        >
          {dimensionsList?.map((dimension) => (
            <MenuItem key={dimension.columnName} value={dimension.columnName}>
              {dimension.columnName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default DimensionsSelect
