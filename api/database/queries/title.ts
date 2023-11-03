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
      tei.external_id "externalId",
      tm.meta
    from title t 
    join title_external_id tei on tei.title_id = t.id
    join data_source ds on ds.id = tei.data_source_id
    join title_meta tm on tm.title_id = t.id
    where t.id = :id
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
