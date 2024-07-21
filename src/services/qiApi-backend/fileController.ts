// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** uploadImg POST /api/file/upload */
export async function uploadImgUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadImgUsingPOSTParams,
  body: string,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseImageVo>('/api/file/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}
