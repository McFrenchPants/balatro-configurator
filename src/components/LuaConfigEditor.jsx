import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  Grid2
} from '@mui/material';
import { useAppContext } from '../AppContext';

const SECTIONS = {
  JOKERS: 'j_',
  TAROTS: ['c_fool', 'c_magician', 'c_high_priestess', 'c_empress', 'c_emperor', 'c_heirophant', 'c_lovers', 'c_chariot', 'c_justice', 'c_hermit', 'c_wheel_of_fortune', 'c_strength', 'c_hanged_man', 'c_death', 'c_temperance', 'c_devil', 'c_tower', 'c_star', 'c_moon', 'c_sun', 'c_judgement', 'c_world'],
  PLANETS: ['c_mercury', 'c_venus', 'c_earth', 'c_mars', 'c_jupiter', 'c_saturn', 'c_uranus', 'c_neptune', 'c_pluto', 'c_planet_x', 'c_ceres', 'c_eris'],
  SPECTRAL: ['c_familiar', 'c_grim', 'c_incantation', 'c_talisman', 'c_aura', 'c_wraith', 'c_sigil', 'c_ouija', 'c_ectoplasm', 'c_immolate', 'c_ankh', 'c_deja_vu', 'c_hex', 'c_trance', 'c_medium', 'c_cryptid', 'c_soul', 'c_black_hole',],
  VOUCHERS: 'v_',
  BACKS: 'b_',
  ENHANCED: 'm_',
  EDITIONS: 'e_',
  BOOSTERS: 'p_'
};

export const LuaConfigEditor = () => {
  const [error, setError] = useState(null);
  const { fieldTypes, currentDataType, data, setData } = useAppContext();

  const parseLuaSection = (luaString) => {
    const items = {};
    const matches = luaString.matchAll(/(\w+)\s*=\s*{([^}]+)}/g);
    console.log(luaString);
    for (const match of matches) {
      const key = match[1];
      const properties = match[2];
      const itemData = {};
      console.log("Reading LUA key:", key);
      console.log("Reading LUA match:", match);

      properties.split(',').forEach(prop => {
        const [k, v] = prop.split('=').map(s => s.trim());
        if (k && v) {
          if (v === 'true') itemData[k] = true;
          else if (v === 'false') itemData[k] = false;
          else if (!isNaN(v)) itemData[k] = Number(v);
          else if (v.includes('{')) {
            try {
              itemData[k] = JSON.parse(v.replace(/{/g, '[').replace(/}/g, ']'));
            } catch {
              itemData[k] = v;
            }
          }
          else itemData[k] = v.replace(/['"]/g, '');
        }
      });

      items[key] = itemData;
    }

    return items;
  };

  const handleValueChange = (itemKey, property, value) => {
    setData(prev => ({
      ...prev,
      [itemKey]: {
        ...prev[itemKey],
        [property]: value
      }
    }));
  };

  const downloadConfig = () => {
    let luaString = 'self.P_CENTERS = {\n';
    Object.entries(data).forEach(([key, value]) => {
      luaString += `  ${key} = {\n`;
      Object.entries(value).forEach(([prop, val]) => {
        let formattedVal;
        if (typeof val === 'boolean') formattedVal = val;
        else if (Array.isArray(val)) formattedVal = `{${val.join(',')}}`;
        else if (typeof val === 'string') formattedVal = `"${val}"`;
        else formattedVal = val;
        luaString += `    ${prop} = ${formattedVal},\n`;
      });
      luaString += '  },\n';
    });
    luaString += '}';

    const blob = new Blob([luaString], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'game_config.lua';
    a.click();
  };

  const filterItemsByType = (items, type) => {
    console.log("Checking for SECTIONS[type]: ", SECTIONS[type]);
    if (!items) return {};
    if (Array.isArray(SECTIONS[type])) { // Return only the items which are defined in the SECTIONS list
      return Object.fromEntries(
        Object.entries(items).filter(([key]) =>
          SECTIONS[type].includes(key)
        )
      );
    }
    return Object.fromEntries( // Return all items that begin with the specified prefix
      Object.entries(items).filter(([key]) =>
        key.startsWith(SECTIONS[type])
      )
    );
  };

  const RenderTemplate = (key, value, type) => {
    
    const matchingFields = fieldTypes[type] || [];
    const visibleFields = matchingFields
      .filter((field) => field.show)
      .map((field) => field.key);

    const filteredValue = Object.fromEntries(
      Object.entries(value).filter(([prop]) => visibleFields.includes(prop))
    );

    //console.info("Filtered list of fields for " + type, filteredValue);

    // Function to handle nested objects
    const renderNestedObject = (obj, parentKey) => {
      return Object.entries(obj).map(([nestedKey, nestedValue]) => (
        <Grid2 item xs={12} sm={6} md={4} key={`${parentKey}.${nestedKey}`}>
          {typeof nestedValue === "boolean" ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={nestedValue}
                  onChange={(e) =>
                    handleValueChange(
                      key,
                      `${parentKey}.${nestedKey}`,
                      e.target.checked
                    )
                  }
                />
              }
              label={`${parentKey}.${nestedKey}`}
            />
          ) : typeof nestedValue === "object" && nestedValue !== null ? (
            renderNestedObject(nestedValue, `${parentKey}.${nestedKey}`)
          ) : (
            <TextField
              fullWidth
              label={`${parentKey}.${nestedKey}`}
              size="small"
              value={nestedValue}
              onChange={(e) =>
                handleValueChange(
                  key,
                  `${parentKey}.${nestedKey}`,
                  typeof nestedValue === "number"
                    ? Number(e.target.value)
                    : e.target.value
                )
              }
            />
          )}
        </Grid2>
      ));
    };

    return (
      <Paper sx={{ p: 1, mb: 2 }} key={key}>
        <Typography variant="subtitle1" gutterBottom>
          {key}
        </Typography>
        <Grid2 container spacing={2}>
          {Object.entries(filteredValue).map(([prop, val]) => {
            if (typeof val === "object" && val !== null) {
              // Render nested objects
              return renderNestedObject(val, prop);
            }
            // Render primitive fields
            return (
              <Grid2 item xs={12} sm={6} md={4} key={prop}>
                {typeof val === "boolean" ? (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={val}
                        onChange={(e) =>
                          handleValueChange(
                            key,
                            prop,
                            e.target.checked
                          )
                        }
                      />
                    }
                    label={prop}
                  />
                ) : (
                  <TextField
                    fullWidth
                    label={prop}
                    size="small"
                    value={val}
                    onChange={(e) =>
                      handleValueChange(
                        key,
                        prop,
                        typeof val === "number"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                )}
              </Grid2>
            );
          })}
        </Grid2>
      </Paper>
    );
  };



  const renderObjectEditor = (key, value) => (
    <Paper sx={{ p: 1, mb: 2 }} key={key}>
      <Typography variant="subtitle1" gutterBottom>
        {key}
      </Typography>
      <Grid2 container spacing={2}>
        {Object.entries(value).map(([prop, val]) => (
          <Grid2 item xs={12} sm={6} md={4} key={prop}>
            {typeof val === 'boolean' ? (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={val}
                    onChange={(e) => handleValueChange(key, prop, e.target.checked)}
                  />
                }
                label={prop}
              />
            ) : (
              <TextField
                fullWidth
                label={prop}
                size="small"
                value={val}
                onChange={(e) => handleValueChange(key, prop,
                  typeof val === 'number' ? Number(e.target.value) : e.target.value
                )}
              />
            )}
          </Grid2>
        ))}
      </Grid2>
    </Paper>
  );

  const renderSection = (title, type) => {
    const { setIsLoading, data } = useAppContext();
    console.info("Rendering section for " + type);
    const items = filterItemsByType(data, type);
    console.log("Entries:", items);
    if (Object.keys(items).length === 0) return null;
    return (
      <Box sx={{ width: '100%', m: 0, p: 0 }}>
        {Object.entries(items).map(([key, value]) =>
          RenderTemplate(key, value, type)
        )}
        {setIsLoading(false)}
      </Box>
    );
  };

  return (
    <Box sx={{ width: '100%', mt: 10, padding: 1, boxSizing: 'border-box' }}>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {currentDataType && (
        <>
          <Typography variant="h5" gutterBottom>
            {currentDataType.label} Configuration Editor
          </Typography>
          <Box sx={{ mt: 2 }}>
            {renderSection(currentDataType.label, currentDataType.value)}
            <Button
              variant="contained"
              onClick={downloadConfig}
              sx={{ mt: 2 }}
            >
              Download Configuration
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default LuaConfigEditor;