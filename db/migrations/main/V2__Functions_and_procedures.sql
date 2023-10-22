--Function to add title by external ID
create or replace function insert_title_by_external_id(
    dataSourceId int,
    externalId text,
    title text,
    mediaTypeId int,
    meta jsonb
)
returns uuid as $$
declare existingTitleId uuid;
declare newTitleId uuid;
begin    
	--Check if there are no existing titles with the dataSourceId/externalId combo
	select title_id into existingTitleId from title_external_id where data_source_id = dataSourceId and external_id = externalId;

    if existingTitleId is null
    then
        -- Insert a new title
        insert into title (title, media_type_id)
        values (title, mediaTypeId)
        RETURNING id into newTitleId;
       
       --Insert the external ID map for the new title
       insert into title_external_id (title_id, data_source_id, external_id)
       values (newTitleId, dataSourceId, externalId);

       --Insert metadata
       insert into title_meta (title_id, meta)
       values (newTitleId, meta);
      
       --Retun the new ID
       return newTitleId;

	else
		return existingTitleId;
    end if;
   
end;
$$ language plpgsql;