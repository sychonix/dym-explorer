// Code generated by github.com/actgardner/gogen-avro. DO NOT EDIT.
/*
 * SOURCES:
 *     block.schema.v1.asvc
 *     pendingtx.schema.v1.asvc
 */

package models

type UnionNullBytes struct {
	Null      interface{}
	Bytes     []byte
	UnionType UnionNullBytesTypeEnum
}

type UnionNullBytesTypeEnum int

const (
	UnionNullBytesTypeEnumNull  UnionNullBytesTypeEnum = 0
	UnionNullBytesTypeEnumBytes UnionNullBytesTypeEnum = 1
)
