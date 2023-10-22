import { pg as SQL } from "yesql";
import { DynamicId } from "../schemas";

const queries = {
  getTitleInfo: (id: DynamicId) =>
    SQL(`
    select
      t.id,
      t.title,
      t.media_type_id "mediaTypeId",
      ds."key" "dataSource",
      tei.external_id "externalId" 
    from title t 
    join title_external_id tei on tei.title_id = t.id
    join data_source ds on ds.id = tei.data_source_id 
    where t.id = '018b055d-0d52-e8dc-13f5-b88a6c2a0baa'
  `)({ id }),

  insertTitleByExternalId: ({
    dataSourceId,
    externalId,
    title,
    mediaTypeId,
    meta
  }: any) =>
    SQL(`select insert_title_by_external_id(
      :dataSourceId, :externalId, :title, :mediaTypeId, :meta
    ) "titleId"`)({ dataSourceId, externalId, title, mediaTypeId, meta }),

  getTitleIdsByExternalIds: (externalTitleData: Array<any>) =>
    `
    select  title_id "titleId",
            data_source_id "dataSourceId",
            external_id "externalId"
    from title_external_id
    WHERE (data_source_id, external_id) IN
    (${externalTitleData
      .map(t => `(${t.dataSourceId}, '${t.externalId}')`)
      .join(",\n")})
  `
};

export default queries;
