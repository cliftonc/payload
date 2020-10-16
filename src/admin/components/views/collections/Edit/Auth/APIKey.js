import React, { useMemo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useFieldType from '../../../../forms/useFieldType';
import Label from '../../../../forms/Label';
import CopyToClipboard from '../../../../elements/CopyToClipboard';
import { text } from '../../../../../../fields/validations';
import { useFormFields } from '../../../../forms/Form/context';

import './index.scss';
import GenerateConfirmation from '../../../../elements/GenerateConfirmation';

const path = 'apiKey';
const baseClass = 'api-key';
const validate = (val) => text(val, { minLength: 24, maxLength: 48 });

const APIKey = () => {
  const [initialAPIKey, setInitialAPIKey] = useState(null);
  const [highlightedField, setHighlightedField] = useState(false);

  const { getField } = useFormFields();

  const apiKey = getField(path);

  const apiKeyValue = apiKey?.value;

  const APIKeyLabel = useMemo(() => (
    <div className={`${baseClass}__label`}>
      <span>
        API Key
      </span>
      <CopyToClipboard value={apiKeyValue} />
    </div>
  ), [apiKeyValue]);

  const fieldType = useFieldType({
    path: 'apiKey',
    validate,
  });

  const highlightField = () => {
    if (highlightedField) {
      setHighlightedField(false);
    }
    setTimeout(() => {
      setHighlightedField(true);
    }, 1);
  };

  const {
    value,
    setValue,
  } = fieldType;

  useEffect(() => {
    setInitialAPIKey(uuidv4());
  }, []);

  useEffect(() => {
    if (!apiKeyValue) {
      setValue(initialAPIKey);
    }
  }, [apiKeyValue, setValue, initialAPIKey]);

  useEffect(() => {
    if (highlightedField) {
      setTimeout(() => {
        setHighlightedField(false);
      }, 10000);
    }
  }, [highlightedField]);

  const classes = [
    'field-type',
    'api-key',
    'read-only',
  ].filter(Boolean).join(' ');

  return (
    <React.Fragment>
      <div className={classes}>
        <Label
          htmlFor={path}
          label={APIKeyLabel}
        />
        <input
          value={value || ''}
          className={highlightedField ? 'highlight' : undefined}
          disabled="disabled"
          type="text"
          id="apiKey"
          name="apiKey"
        />
      </div>
      <GenerateConfirmation
        setKey={() => setValue(uuidv4())}
        highlightField={highlightField}
      />
    </React.Fragment>
  );
};

export default APIKey;