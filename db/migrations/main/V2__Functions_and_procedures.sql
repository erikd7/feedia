--Function to add title by external ID
CREATE OR REPLACE FUNCTION insert_title_by_external_id(
    dataSourceId int,
    externalId text,
    title text,
    mediaTypeId int
)
returns uuid as $$
declare newTitleId uuid;
begin    
	--Check if there are no existing titles with the dataSourceId/externalId combo
    if NOT EXISTS (SELECT title_id FROM title_external_id WHERE data_source_id = dataSourceId and external_id = externalId)
    THEN
        -- Insert a new title
        INSERT INTO title (title, media_type_id)
        VALUES (title, mediaTypeId)
        RETURNING id INTO newTitleId;
       
       --Insert the external ID map for the new title
       insert into title_external_id (title_id, data_source_id, external_id)
       values (newTitleId, dataSourceId, externalId);
	               
    END IF;
   
   return newTitleId;
END;
$$ LANGUAGE plpgsql;